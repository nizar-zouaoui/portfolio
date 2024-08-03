import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ACCESS_PRIVILIGE, RESOURCE } from "@nizar-repo/route-protector";
import { Document } from "mongoose";

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class AccessResource {
  @Prop({ required: true })
  accessPrivilege: ACCESS_PRIVILIGE;

  @Prop({ required: true })
  resource: RESOURCE;
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
