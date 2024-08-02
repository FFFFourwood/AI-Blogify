import { ObjectId } from 'mongoose';
import Category, { ICategory } from '../models/categoryModel';
import logger from '../utils/logger';



// Create a category, return the existing category if the name exists.
export const createCategories = async (names: string[]): Promise<ICategory[]> => {
    const categories: ICategory[] = [];
    logger.info(`CategoryService:Creating category:${names}`);
    const promises = names.map(async (name) => {
        const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
        try {
            let existingCategory = await Category.findOne({ slug });
            logger.info(`CategoryService:existingCategory:${existingCategory}`);
            if (existingCategory) {
                logger.info(`CategoryService:Category already exists`);
                return existingCategory;
            } else {
                const newCategory = await Category.create({ name, slug });
                logger.info(`CategoryService:Category created successfully : ${newCategory}`);
                return newCategory;
            }
        } catch (error) {
            if (error.code === 11000) {
                logger.error(`CategoryService:Error creating category:${error}`);
                const existingCategory = await Category.findOne({ slug });
                return existingCategory;
            } else {
                logger.error(`CategoryService:Error creating category:${error}`);
                throw error;
            }
        }
    });

    const results = await Promise.all(promises);
    results.forEach(category => {
        if (category && !categories.some(c => c._id.equals(category._id))) {
            categories.push(category);
        }
    });
    logger.info(`CategoryService:Category created successfully`);
    return categories;
};

// Query all categories
export const getAllCategories = async (): Promise<ICategory[]> => {
    const categories = await Category.find();
    return categories;
};

// Update category, update category name and slug according to ID.
export const updateCategory = async (categoryId: ObjectId, name: string): Promise<ICategory | null> => {
    const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
    const category = await Category.findByIdAndUpdate(
        categoryId,
        { name, slug },
        { new: true, runValidators: true }
    );
    return category;
};

// Delete category, delete category by ID.
export const deleteCategory = async (categoryId: ObjectId): Promise<{ message: string }> => {
    const result = await Category.findByIdAndDelete(categoryId);
    if (!result) {
        throw new Error('Category not found');
    }
    return { message: 'Category deleted successfully' };
};


// Query a single category, query the category by ID.
export const getCategoryById = async (categoryId: ObjectId): Promise<ICategory | null> => {
    const category = await Category.findById(categoryId);
    return category;
};