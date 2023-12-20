// import { Field, InputType, ObjectType } from "type-graphql";
// import { getModelForClass, index, prop, Ref } from "@typegoose/typegoose";
// import { IsNumber, MaxLength, Min, MinLength } from "class-validator";



// @ObjectType()
// @index({ subjectId: 1 })
// export class Chapter {
//   @Field(() => String)
//   @prop({ type: () => String })
//   subjectId: string = ""; // Initialized with an empty string
//   @Field(() => String)
//   @prop({ type: () => String })
//   chapterName: string;
//   @Field(() => [String])
//   @prop({ type: () => [String] })
//   lesson: string[];
// }

// export class CreateChapterInput {
//   @Field()
//   subjectId: string;
//   @Field()
//   chapterName: string;
//   @Field()
//   lesson: string[];

// }