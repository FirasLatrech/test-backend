// import { Resolver, Query, Mutation, Arg } from "type-graphql";
// import { Chapter, CreateChapterInput } from "./schema/chapter.schema";
// import ChapterService from "../services/chapter.service";

// @Resolver(() => Chapter)
// export default class ChapterResolver {
//   constructor(private chapterService: ChapterService) {
//     this.ChapterService = new ChapterService();
//   } 
//   @Mutation(() => Chapter)
//   createChapter(
//     @Arg("input") input: CreateChapterInput,
//   ) {
//     return this.ChapterService.createChapter({ ...input});
//   }


//   @Query(() => Chapter)
//   async getChapter(): Promise<Chapter> {
//     return {
//       subjectId: "dummySubjectId",
//       chapterName: "dummyChapterName",
//       lesson: ["lesson1", "lesson2"],
//     };
//   }
// }
