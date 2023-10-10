const express = require("express");
const {validToken} = require("../middleware/authenticateToken");
const Category = require("../models/Categories.js");
const { ValidationError } = require( "../Error/error");
const categoryRouter = express.Router();


const deleteCategoryAndChildren = async (categoryId) => {
    // Recursively collect all child category IDs
    const childCategoryIds = await collectChildCategoryIds(categoryId);
    // Delete the parent category and all its child categories
    await Category.deleteMany({ _id: { $in: [...childCategoryIds, categoryId] } });
};
  
const collectChildCategoryIds = async (parentId) => {
    const childCategoryIds = [];
    const childCategories = await Category.find({ parent: parentId });
    for (const childCategory of childCategories) {
      childCategoryIds.push(childCategory._id);
      const grandChildCategoryIds = await collectChildCategoryIds(childCategory._id);
      childCategoryIds.push(...grandChildCategoryIds);
    }
    return childCategoryIds;
};

const populateAllParents = async (categoryId) => {
    const category = await Category.findById(categoryId)
                                  .select("name parent post_count")
                                  .populate("parent", "name parent post_count");
  
    if (!category) {
      return [];
    }
    const parentCategories = await populateAllParents(category.parent);
    category.parent = parentCategories;
    return category;
};

categoryRouter.post("/addCategory", validToken, async (req, res) => {
  const { name, description, parent } = req.body;
  try {
    if (!name) {
        return res.json({
            status : false,
            data: null,
            message : "!Required name"
        })

    };
    const isExist = await Category.findOne({ name });
    if (isExist && isExist?.parent === parent){
        return res.json({
            status : false,
            data: null,
            message : "Category already exist"
        })

    };
      const newCategoryData = {
        name,
        description,
      };
      
      if (parent !== undefined && parent !== null) {
        newCategoryData.parent = parent;
      }
    const newCategory = new Category(newCategoryData);
    const savedCategory = await newCategory.save();
      return res.json({
        status: true,
        data: savedCategory,
        message: " A new Catgeory Added",
      });
    
  } catch (error) {
    return res.json({
        status : false,
        data: null,
        message : "Something went wrong!"
    })
  }

});

categoryRouter.get("/getAllCategory" , validToken , async(req , res) => {
    try{
        const getAllCategories = await Category.find({});
        if( !getAllCategories) {
            return res.json({
                status : false,
                data: null,
                message : "categories not found"
            })
    
        }
        const resData = getAllCategories.map((item) => {
              return { name: item?.name, parent: item?.parent };
          });
        return res.json({
            status : true ,
            data: resData,
            message: " All Category Fetched"
        })

    }catch(error){
        return res.json({
            status : false,
            data : null,
            message : error
        })
    }
})

categoryRouter.delete("/deleteCategory/:id", validToken , async(req,res) => {
    const { id } = req.params;
    if( !id) {
        return res.json({
            status : false,
            data: null,
            message : "Id not found"
        })
    }
    try{
        // const delCategory = await Category.findByIdAndDelete(id);
        // if( !delCategory) throw new ValidationError(" Category not found") ;
        await deleteCategoryAndChildren(id);
        return res.json({
            status : true,
            data : null,
            message : "Category Deleted."
        })

    }catch(error){
        return res.json({
            status:false,
            data : null,
            message : error.message,
        })
    }
})

categoryRouter.put("/updateCategory/:id" , validToken , async(req,res) =>{
    const { id } = req.params;
    const { name , parent , description} = req.body;
    if( !id || !name) {
        return res.json({
            status : false,
            data: null,
            message : "!Required name , id"
        })

    };
    try{
        const category = await Category.findById(id);
        if( !parent) parent = category?.parent;
        if( !description) description = category?.description;

        const newCategory = await Category.findByIdAndUpdate(id, {
            name , parent , description
        } , { new: true });

        if( newCategory) {
            return res.json({
                status : true,
                data : newCategory,
                message : "Category updated"
            })
        }
    }catch(error){
        return res.json({
            status : false,
            data : null,
            message :" Category not update"
        })
    }
} )

categoryRouter.get("/getCategory/:id", validToken,async(req, res) => {
    const { id } = req.params;
    if( !id) {
        return res.json({
            status : false,
            data: null,
            message : "Id not found"
        })

    }
    try{
        const allParentCategories = await populateAllParents(id);
        // if( !allParentCategories) {
        //     return res.json({
        //         status : false,
        //         data: null,
        //         message : "Categories went wrond"
        //     })
    
        // };
        return res.json({
            status : true,
            data : allParentCategories,
            message : "Category Fetch"
        })

    }catch(error){
        return res.json({
            status:false,
            data : null,
            message : error.message,
        })
    }

} )
module.exports = categoryRouter;
