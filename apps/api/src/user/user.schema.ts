import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {hash} from "bcrypt";

@Schema()
export class User {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true, unique: true })
    email: string;
    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
