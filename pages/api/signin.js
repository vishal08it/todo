import { getUserByEmail } from "@/Utils/auth";
import { AdminClient } from "@/Utils/axios_client";
import { generateJWT } from "@/Utils/jwt";
import { GET_USER_BY_EMAIL } from "@/graphql/queries";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { email, password } = req.body;
 
  await getUserByEmail(email)
    .then(async (user) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: "The user is not registered yet." });
      } else {
        const validPassword = await bcrypt.compare(password, user.Password);
        if (!validPassword)
          return res
            .status(401)
            .send({ message: "Password is Incorect, Try again" });

            //sign user token by user Id jwt
        const token = generateJWT({
          otherClaims: {
            "X-Hasura-User-Id": user.Id.toString(),
          },
        
        });

        return res.status(200).json({
          token,
          id: user.Id,
          username: user.Email,
        });
      }
    })
    .catch((error) => {
     
      if (error.message === "The user is not registered yet.") {
        console.log("ERROR", error.message);
        return res.status(400).json({ message: "The user is not registered yet." });
      } else {
        console.log("ERROR", error.Error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });
}
