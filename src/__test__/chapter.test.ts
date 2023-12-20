import Chapter from '../database/repositories/chapter.repository';
import ChapterService from '../services/chapter.service';
import AppError from '../utils/AppError';

jest.mock('../database/repositories/chapter.repository');



describe('ChapterService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all chapters', async () => {
    const mockChapters = [{ _id: '1', chapterName: 'Chapter 1' }];
    (Chapter.getAllChapters as jest.Mock).mockResolvedValueOnce(mockChapters);

    const result = await ChapterService.getAllChapters();

    expect(result).toEqual({
      status: 'success',
      result: mockChapters.length,
      data: {
        chapters: mockChapters,
      },
    });
  });

  it('should get a chapter by ID', async () => {
    const mockChapter = { _id: '1', chapterName: 'Chapter 1' };
    (Chapter.getChapterById as jest.Mock).mockResolvedValueOnce(mockChapter);

    const result = await ChapterService.getChapterById('1');

    expect(result).toEqual({
      status: 'success 😎',
      data: {
        chapter: mockChapter,
      },
    });
  });

  it('should create a chapter', async () => {
    const chapterData = { chapterName: 'New Chapter' };
    const createdChapter = { _id: '2', chapterName: 'New Chapter' };
    (Chapter.createChapter as jest.Mock).mockResolvedValueOnce(createdChapter);

    const result = await ChapterService.createChapter(chapterData);

    expect(result).toEqual({
      status: 'success',
      data: {
        chapter: createdChapter,
      },
    });
  });

  it('should update a chapter by ID', async () => {
    const chapterId = '1';
    const chapterData = { chapterName: 'Updated Chapter' };
    const updatedChapter = { _id: '1', chapterName: 'Updated Chapter' };
    (Chapter.updateChapterById as jest.Mock).mockResolvedValueOnce(updatedChapter);

    const result = await ChapterService.updateChapterById(chapterId, chapterData);

    expect(result).toEqual({
      status: 'success',
      data: {
        chapter: updatedChapter,
      },
    });
  });

  it('should throw an error when updating a non-existent chapter', async () => {
    const chapterId = 'nonexistentId';
    const chapterData = { chapterName: 'Updated Chapter' };
    (Chapter.updateChapterById as jest.Mock).mockResolvedValueOnce(null);

    await expect(ChapterService.updateChapterById(chapterId, chapterData)).rejects.toThrow(
      new AppError('Chapter not found', 404, 'error 👺')
    );
  });

  it('should delete a chapter by ID', async () => {
    const chapterId = '1';
    (Chapter.deleteChapterById as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await ChapterService.deleteChapterById(chapterId);

    expect(result).toEqual({
      status: 'success',
      data: null,
    });
  });
});
