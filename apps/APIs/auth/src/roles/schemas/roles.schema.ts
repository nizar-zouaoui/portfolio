import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema()
export class AccessResource {
  @Prop({ required: true })
  accessPrivilege: string;

  @Prop({ required: true })
  resource: string;
}

const AccessResourceSchema = SchemaFactory.createForClass(AccessResource);

@Schema()
export class Role {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [AccessResourceSchema], default: [] })
  accessResources: AccessResource[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
