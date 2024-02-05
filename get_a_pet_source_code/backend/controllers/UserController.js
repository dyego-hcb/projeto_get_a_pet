const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword, phone } = req.body;

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: "A senha de confirmacao é obrigatória" });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a senha de confirmacao precisam ser iguais !",
      });
      return;
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ message: "Por favor, utilize outro e-mail !" });
      return;
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email: email,
      password: passwordHash,
      phone: phone,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      res
        .status(422)
        .json({ message: "Nāo há usuário cadastrado com este e-mail !" });
      return;
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(422).json({ message: "Senha inválida !" });
      return;
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário nāo encontrado !" });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, phone, password, confirmpassword } = req.body;

    if(req.file)
    {
        user.image = req.file.filename;
    }

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    user.name = name;

    if (!email) {
      res.status(422).json({ message: "O e-mail é obrigatório" });
      return;
    }

    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({
        message:
          "Por favor, utilize outro e-mail",
      });
      return;
    }

    user.email = email;

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a senha de confirmacao precisam ser iguais !",
      });
      return;
    }else if(password === confirmpassword && password != null)
    {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash
    }

    if (!phone) {
      res.status(422).json({ message: "O telefone é obrigatório" });
      return;
    }

    user.phone = phone;

    try{
        await User.findOneAndUpdate({_id: user.id}, {$set: user}, {new: true});
        res.status(200).json({message: "Usuário atualizado com sucesso !!"});
    }catch(err)
    {
        res.status(500).json({message: err});
        return
    }
  }
};
