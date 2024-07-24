import { ObjectId } from 'mongoose';
import Category, { ICategory } from '../models/categoryModel';

// 创建分类，如果 name 存在则返回已存在的分类
export const createCategory = async (name: string): Promise<ICategory | null> => {
    const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        return existingCategory;
    }
    const category = await Category.create({ name, slug });
    return category;
};

// 更新分类，根据 ID 更新分类名称和 slug
export const updateCategory = async (categoryId: ObjectId, name: string): Promise<ICategory | null> => {
    const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
    const category = await Category.findByIdAndUpdate(
        categoryId,
        { name, slug },
        { new: true, runValidators: true }
    );
    return category;
};

// 删除分类，根据 ID 删除分类
export const deleteCategory = async (categoryId: ObjectId): Promise<{ message: string }> => {
    const result = await Category.findByIdAndDelete(categoryId);
    if (!result) {
        throw new Error('Category not found');
    }
    return { message: 'Category deleted successfully' };
};

// 查询所有分类
export const getAllCategories = async (): Promise<ICategory[]> => {
    const categories = await Category.find();
    return categories;
};

// 查询单个分类，根据 ID 查询分类
export const getCategoryById = async (categoryId: ObjectId): Promise<ICategory | null> => {
    const category = await Category.findById(categoryId);
    return category;
};