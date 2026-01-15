// import { Document } from "mongoose";

// export interface UserTypes extends Document {
//   username: string;
//   email: string;
//   password: string;
//   phone_number?: number;
// }

import { Document } from "mongoose";

export interface UserTypes extends Document {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
}
