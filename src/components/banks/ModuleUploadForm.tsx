'use client';

import { useState } from 'react';
import { createModule, uploadFile, getPublicUrl, QuizQuestion } from '@/lib/supabase';

interface ModuleUploadFormProps {
  bankName: string;
  onSuccess: () => void;
}

export default function ModuleUploadForm({ bankName, onSuccess }: ModuleUploadFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Investment' as 'Investment' | 'Insurance' | 'Government Schemes' | 'Netbanking' | 'Other',
    content_type: 'Article' as 'Article' | 'PDF' | 'Interactive Quiz' | 'Video Link',
    content_url: '',
    language: 'English',
    difficulty_level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    estimated_duration: 15,
    tags: '',
    published: false,
  });

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['Investment', 'Insurance', 'Government Schemes', 'Netbanking', 'Other'];
  const contentTypes = ['Article', 'PDF', 'Interactive Quiz', 'Video Link'];
  const languages = ['English', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'];
  const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const addQuizQuestion = () => {
    setQuizQuestions(prev => [...prev, {
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    }]);
  };

  const updateQuizQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    setQuizQuestions(prev => prev.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    ));
  };

  const removeQuizQuestion = (index: number) => {
    setQuizQuestions(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setContentFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let contentUrl = '';

      // Upload file if present
      if (contentFile) {
        const fileExtension = contentFile.name.split('.').pop();
        const fileName = `${Date.now()}-${bankName.replace(/\s+/g, '-').toLowerCase()}.${fileExtension}`;
        const filePath = `bank_modules/${fileName}`;

        const { data: uploadData, error: uploadError } = await uploadFile(
          contentFile,
          'bank_modules',
          filePath
        );

        if (uploadError) {
          throw new Error(`File upload failed: ${uploadError.message}`);
        }

        contentUrl = getPublicUrl('bank_modules', filePath);
      }

      // Create module
      const moduleData = {
        bank_name: bankName,
        bank_logo_url: null, // Will be updated later when bank profile is complete
        title: formData.title,
        description: formData.description,
        category: formData.category,
        content_type: formData.content_type,
        content_url: contentUrl || null,
        quiz_questions: formData.content_type === 'Interactive Quiz' ? quizQuestions : [],
        language: formData.language,
        difficulty_level: formData.difficulty_level,
        estimated_duration: formData.estimated_duration,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        is_published: formData.published,
      };

      const { error: createError } = await createModule(moduleData);

      if (createError) {
        throw new Error(`Failed to create module: ${createError.message}`);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Investment',
        content_type: 'Article',
        content_url: '',
        language: 'English',
        difficulty_level: 'Beginner',
        estimated_duration: 15,
        tags: '',
        published: false,
      });
      setQuizQuestions([]);
      setContentFile(null);

      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Module Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Digital Banking Security Basics"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Provide a detailed description of what users will learn..."
          />
        </div>

        {/* Content Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="content_type" className="block text-sm font-medium text-gray-700 mb-2">
              Content Type *
            </label>
            <select
              id="content_type"
              name="content_type"
              required
              value={formData.content_type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {contentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
              Language *
            </label>
            <select
              id="language"
              name="language"
              required
              value={formData.language}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="difficulty_level" className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level *
            </label>
            <select
              id="difficulty_level"
              name="difficulty_level"
              required
              value={formData.difficulty_level}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {difficultyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* File Upload */}
        {(formData.content_type === 'PDF' || formData.content_type === 'Video Link') && (
          <div>
            <label htmlFor="content_file" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Content File
            </label>
            <input
              type="file"
              id="content_file"
              onChange={handleFileChange}
              accept={formData.content_type === 'PDF' ? '.pdf' : 'video/*'}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Quiz Questions */}
        {formData.content_type === 'Interactive Quiz' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Quiz Questions</h3>
              <button
                type="button"
                onClick={addQuizQuestion}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Add Question
              </button>
            </div>

            {quizQuestions.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeQuizQuestion(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter question..."
                    value={question.question}
                    onChange={(e) => updateQuizQuestion(index, 'question', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${index}-correct`}
                          checked={question.correctIndex === optionIndex}
                          onChange={() => updateQuizQuestion(index, 'correctIndex', optionIndex)}
                          className="text-blue-600"
                        />
                        <input
                          type="text"
                          placeholder={`Option ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...question.options];
                            newOptions[optionIndex] = e.target.value;
                            updateQuizQuestion(index, 'options', newOptions);
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder="Explanation (optional)"
                    value={question.explanation || ''}
                    onChange={(e) => updateQuizQuestion(index, 'explanation', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="estimated_duration" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Duration (minutes)
            </label>
            <input
              type="number"
              id="estimated_duration"
              name="estimated_duration"
              min="1"
              value={formData.estimated_duration}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., security, banking, beginner"
            />
          </div>
        </div>

        {/* Publish Option */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={formData.published}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 text-sm text-gray-700">
            Publish immediately (users will be able to see this module)
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? 'Creating Module...' : 'Create Module'}
          </button>
        </div>
      </form>
    </div>
  );
}