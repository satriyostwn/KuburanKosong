import axios from "axios";

export const register = newUser => {
  return axios.post("users/register", {
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    email: newUser.email,
    password: newUser.password
  });
};

export const login = user => {
  return axios
    .post("users/login", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const admin = user => {
  return axios
    .post("users/admin", {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem("usertoken", res.data);
      return res.data;
    })
    .catch(err => {});
};

export const film = newUser => {
  return axios.post("users/film", {
    film_name: newUser.film_name,
    genre_film: newUser.genre_film,
    description: newUser.description,
    price: newUser.price
  });
};

export const kuburan = newUser => {
  return axios.post("users/film", {
    nama_kuburan: newUser.nama_kuburan,
    alamat_kuburan: newUser.alamat_kuburan,
    description: newUser.description,
    price: newUser.price
  });
};

export const home = user => {
  return axios.get("users/home", (req, res, next) => {
    user.find({}).then(function(kuburan_db) {
      res.json(kuburan_db);
    });
  });
};
