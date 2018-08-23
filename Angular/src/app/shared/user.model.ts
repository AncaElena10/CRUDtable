export class User {
  _id: string;
  password: string;
  verify: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  location: string;
  twitterName: string;
  githubName: string;
  facebookName: string;
  youtubeName: string;
  hobby: string;
  bio: string;
  profilePicture: "blob";
  birthday: Date;
  publicBirthday: boolean;
  phoneNumber: Number;
}