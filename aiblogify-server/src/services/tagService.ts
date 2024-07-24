import { ObjectId } from 'mongoose';
import Tag, { ITag } from '../models/tagModel';

// Create a tag, return the existing tag if the name exists.
export const createTags = async (names: string[]): Promise<ITag[]> => {
    const tags: ITag[] = [];

    const promises = names.map(async (name) => {
        const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
        try {
            let existingTag = await Tag.findOne({ slug });
            if (existingTag) {
                return existingTag;
            } else {
                const newTag = await Tag.create({ name, slug });
                return newTag;
            }
        } catch (error) {
            if (error.code === 11000) {
                const existingTag = await Tag.findOne({ slug });
                return existingTag;
            } else {
                throw error;
            }
        }

    });

    const results = await Promise.all(promises);

    results.forEach(tag => {
        if (tag && !tags.some(c => c._id.equals(tag._id))) {
            tags.push(tag);
        }
    });


    return tags;
};

// Update tag, update tag name and slug according to ID.
export const updateTag = async (tagId: ObjectId, name: string): Promise<ITag | null> => {
    const slug = name.trim().replace(/\s+/g, '-').toLowerCase();
    const tag = await Tag.findByIdAndUpdate(
        tagId,
        { name, slug },
        { new: true, runValidators: true }
    );
    return tag;
};

// Löschen Sie ein Tag anhand der ID.
export const deleteTag = async (tagId: ObjectId): Promise<{ message: string }> => {
    const result = await Tag.findByIdAndDelete(tagId);
    if (!result) {
        throw new Error('tag not found');
    }
    return { message: 'tag deleted successfully' };
};

// Query all tags
export const getAllTags = async (): Promise<ITag[]> => {
    const tags = await Tag.find();
    return tags;
};

// Query a single tag, query tag based on ID.
export const getTagById = async (tagId: ObjectId): Promise<ITag | null> => {
    const tag = await Tag.findById(tagId);
    return tag;
};