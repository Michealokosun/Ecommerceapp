// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
  where,
  query,
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrs4y_i6IpUQW2PhWZCoD8nABPbMO8z9g",
  authDomain: "ecommshop-fae60.firebaseapp.com",
  projectId: "ecommshop-fae60",
  storageBucket: "ecommshop-fae60.firebasestorage.app",
  messagingSenderId: "137591539068",
  appId: "1:137591539068:web:aada03a6cbafa8bc1690f9",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore(app);

// ------------------------- SIGN IN USER WITH THERI EMAIL AND PASSWORD ---------------------------
export const SigninUserwithemail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    toast.success("successfully signedin");

    return user;
  } catch (error) {
    const errormessage = error.message;
    toast.error("invalid Eamil/Password", errormessage);
  }
};

// ------------------------------ REGISTER USER WITH THEIR EMAIL ------------------------------------------------------------------
export const CreateuserwithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    toast.success("successfully Registered");
    return user;
  } catch (error) {
    const errormessage = error.message;
    return errormessage;
  }
};

// /==================================  LOG OUT USER =============

export const logoutuser = () =>
  signOut(auth)
    .then(() => {
      toast.success("Sign-out successful.");
    })
    .catch((error) => {
      // An error happened.
    });

// const products = [
//   {
//     id: 1,
//     name: "Wireless Mouse",
//     description: "A smooth and precise wireless mouse with ergonomic design.",
//     price: 29.99,
//     image: "https://via.placeholder.com/150",
//     category: "Electronics",
//   },
//   {
//     id: 2,
//     name: "Bluetooth Headphones",
//     description: "Noise-cancelling headphones with superior sound quality.",
//     price: 79.99,
//     image: "https://via.placeholder.com/150",
//     category: "Electronics",
//   },
//   {
//     id: 3,
//     name: "Running Shoes",
//     description: "Lightweight and comfortable running shoes for all-day wear.",
//     price: 59.99,
//     image: "https://via.placeholder.com/150",
//     category: "Sportswear",
//   },
//   {
//     id: 4,
//     name: "Backpack",
//     description: "Durable and spacious backpack for school, work, or travel.",
//     price: 49.99,
//     image: "https://via.placeholder.com/150",
//     category: "Accessories",
//   },
//   {
//     id: 5,
//     name: "Smart Watch",
//     description:
//       "Track your fitness and stay connected with a stylish smart watch.",
//     price: 199.99,
//     image: "https://via.placeholder.com/150",
//     category: "Electronics",
//   },
//   {
//     id: 6,
//     name: "Desk Lamp",
//     description:
//       "Adjustable LED desk lamp with touch controls and USB charging.",
//     price: 24.99,
//     image: "https://via.placeholder.com/150",
//     category: "Home",
//   },
//   {
//     id: 7,
//     name: "Coffee Maker",
//     description:
//       "Compact and efficient coffee maker for your daily brewing needs.",
//     price: 39.99,
//     image: "https://via.placeholder.com/150",
//     category: "Kitchen",
//   },
//   {
//     id: 8,
//     name: "Yoga Mat",
//     description:
//       "Eco-friendly and non-slip yoga mat for your fitness routines.",
//     price: 19.99,
//     image: "https://via.placeholder.com/150",
//     category: "Sportswear",
//   },
//   {
//     id: 9,
//     name: "Tablet",
//     description:
//       "High-performance tablet with a stunning display and long battery life.",
//     price: 299.99,
//     image: "https://via.placeholder.com/150",
//     category: "Electronics",
//   },
// ];

// export default products;

export const createuserdoc = async (user, product) => {
  try {
    const cartCollectionRef = collection(db, "users", user.uid, "cartItems");
    // Query for the specific product by ID
    const q = query(cartCollectionRef, where("id", "==", product.id));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const productId = querySnapshot.docs[0].id;
      // const productqnty = querySnapshot.docs[0].qnty;

      incrementQuanty(user, productId);
      toast.success("Item updates to cart");

      return; // Product exists
    } else {
      // if not in cart add to cart
      await addDoc(cartCollectionRef, { ...product, qnty: 1 });
      toast.success("Item added to cart");
    }
  } catch (error) {
    toast.error("Error adding to cart: ", error.message);
  }
};

export const incrementQuanty = async (user, itemid) => {
  try {
    const productRef = doc(db, "users", user.uid, "cartItems", itemid);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      // Get the current quantity
      const currentQuantity = productSnap.data().qnty || 0;

      // Increment the quantity
      await updateDoc(productRef, {
        qnty: currentQuantity + 1,
      });
    }
  } catch (error) {
    toast.error("Error adding to cart: ", error.message);
  }
};
export const decrementQuanty = async (user, product) => {
  try {
    const cartCollectionRef = collection(db, "users", user.uid, "cartItems");
    // Query for the specific product by ID
    const q = query(cartCollectionRef, where("id", "==", product.id));
    const querySnapshot = await getDocs(q);
    const productId = querySnapshot.docs[0].id;
    console.log(productId, product.id);

    const productRef = doc(db, "users", user.uid, "cartItems", productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      // Get the current quantity
      const currentQuantity = productSnap.data().qnty || 0;
      if (currentQuantity < 2) {
        deleteDoc(productRef);
        toast.success("Item removes from cart");
      } else {
        await updateDoc(productRef, {
          qnty: currentQuantity - 1,
        });
        toast.success("Item updates to cart");
      }
    }
  } catch (error) {
    toast.error("Error adding to cart: ", error.message);
  }
};

export const getCartItems = async (user) => {
  try {
    const cartCollectionRef = collection(db, "users", user.uid, "cartItems");

    const cartSnapshot = await getDocs(cartCollectionRef);
    const cartItems = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return cartItems;
  } catch (error) {}
};
