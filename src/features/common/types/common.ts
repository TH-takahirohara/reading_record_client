export interface IReading {
  id: number;
  bookName: string;
  bookAuthor: string;
  totalPageCount: number;
  currentPage: number;
  memo: string;
  dailyProgresses: IDailyProgress[];
}

export interface IDailyProgress {
  id: number;
  readDate: string;
  readPage: number;
}
