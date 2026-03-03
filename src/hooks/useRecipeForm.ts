import { useState, useCallback } from 'react';
import type { Recipe } from '../types/Recipe';
import React from 'react';
import { RecipeService } from '../services/RecipeService';

/**
 * Hook to manage the add recipe form.
 * @returns fields - current form values, handleChange - update a field,
 * handleSubmit - submit the form, resetForm - clear all fields,
 * validationErrors - list of errors, submitting - is submitting,
 * submitError - error msg if submit failed, submitSuccess - true if submitted ok
 */
export function useRecipeForm() {
    const [fields, setFields] = useState<{
        title: string;
        image: string;
        cuisineType: string;
        difficulty: string;
        prepTime: string;
        cookTime: string;
        servings: string;
        ingredients: string;
        instructions: string;
    }>({
        title: '',
        image: '',
        cuisineType: '',
        difficulty: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        ingredients: '',
        instructions: ''
    });
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = useCallback(
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
        ) => {
            const { name, value } = e.target;
            setFields((prev) => ({ ...prev, [name]: value }));
            // Clear errors when user starts editing
            if (validationErrors.length > 0) setValidationErrors([]);
            if (submitError) setSubmitError(null);
            if (submitSuccess) setSubmitSuccess(false);
        },
        [validationErrors.length, submitError, submitSuccess]
    );

    const resetForm = useCallback(() => {
        setFields({
            title: '',
            image: '',
            cuisineType: '',
            difficulty: '',
            prepTime: '',
            cookTime: '',
            servings: '',
            ingredients: '',
            instructions: ''
        });
        setValidationErrors([]);
        setSubmitError(null);
        setSubmitSuccess(false);
    }, []);

    const buildRecipeFromFields = useCallback((): Omit<Recipe, 'id' | 'createdAt'> => {
        return {
            title: fields.title.trim(),
            image: fields.image.trim() || undefined,
            cuisineType: fields.cuisineType.trim(),
            difficulty: fields.difficulty as 'Easy' | 'Medium' | 'Hard',
            prepTime: Number(fields.prepTime),
            cookTime: Number(fields.cookTime),
            servings: Number(fields.servings),
            ingredients: fields.ingredients
                .split('\n')
                .map((i) => i.trim())
                .filter(Boolean),
            instructions: fields.instructions
                .split('\n')
                .map((s) => s.trim())
                .filter(Boolean)
        };
    }, [fields]);

    const handleSubmit = useCallback(
        async (e: React.FormEvent): Promise<Recipe | null> => {
            e.preventDefault();
            setSubmitError(null);
            setSubmitSuccess(false);

            const recipeData = buildRecipeFromFields();

            // Run validation via service
            const { valid, errors } = RecipeService.validateRecipe(recipeData);
            if (!valid) {
                setValidationErrors(errors);
                return null;
            }

            setValidationErrors([]);
            setSubmitting(true);

            try {
                const created = await RecipeService.createRecipe(recipeData);
                setSubmitSuccess(true);
                resetForm();
                return created;
            } catch (err) {
                setSubmitError(
                    err instanceof Error ? err.message : 'Failed to submit recipe'
                );
                return null;
            } finally {
                setSubmitting(false);
            }
        },
        [buildRecipeFromFields, resetForm]
    );

    return {
        fields,
        handleChange,
        handleSubmit,
        resetForm,
        validationErrors,
        submitting,
        submitError,
        submitSuccess
    };
}
