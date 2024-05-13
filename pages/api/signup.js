import { createUserMutation } from "@/Utils/auth";
import { generateJWT } from "@/Utils/jwt";

export default async function handler(req, res) {
  const { email, password, name } = req.body;
  const data = {
    Email: email,
    Name: name,
    Password: password,
  };
  await createUserMutation({ data })
    .then(async (user) => {
      if (!user) {
        return res.status(400).json({ message: "Something went wrong" });
      } else {
        const token = generateJWT({
          otherClaims: {
            "X-Hasura-User-Id": user.Id.toString(),
          },
        });

        return res.status(200).json({
          token,
          id: user.Id,
          username: user.Name,
          email: user.Email,
        });
      }
    })
    .catch((error) => {
      console.log("ERROR", error);
      if (error.message === "Email is already taken") {
        return res.status(400).json({ message: "Email is already taken" });
      } else {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    });
}
