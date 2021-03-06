import Vue from "vue";
import VueRouter from "vue-router";

//LAYOUTS
import AuthLayout from "@/layouts/AuthLayout";
import OneSpotLayout from "@/layouts/OneSpotLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

//VIEWS AUTH
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

//VIEWS - DASHBOARD
import MyEventsViews from "@/views/MyEventsView";
import ClientsAccountsView from "@/views/ClientsAccountsView";
import AdminsAccountsView from "@/views/AdminsAccountsView";
import onReviewEventsView from "@/views/OnReviewEventsView";
import ReviewEventView from "@/views/ReviewEventView";
import EditMyEventView from "@/views/EditMyEventView";

// VIEWS APP
import Home from "../views/Home.vue";
import EventDetails from "@/views/EventDetails";
import NearbyEventsView from "@/views/NearbyEventsView";
import RecommendedView from "@/views/RecommendedView";
import SearchEventsView from "@/views/SearchEventsView";
import AccountProfileView from "@/views/AccountProfileView";
import FavoritesView from "@/views/FavoritesView";
import BrowseView from "@/views/BrowseView";
import PromoterProfile from "@/views/PromoterProfileView";

//FIREBASE
import firebase from "firebase/app";
import "firebase/firebase-auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: LoginView,
      },
      {
        path: "/register",
        name: "Register",
        component: RegisterView,
      },
    ],
  },
  {
    path: "/",
    component: OneSpotLayout,
    children: [
      {
        path: "/",
        name: "OneSpot",
        component: Home,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/browse",
        name: "BrowseView",
        component: BrowseView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/favorites",
        name: "FavoritesView",
        component: FavoritesView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/search",
        name: "SearchEvent",
        component: SearchEventsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/event/:eventId",
        name: "Event Details",
        component: EventDetails,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/nearby",
        name: "NearbyEvents",
        component: NearbyEventsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/recommended",
        name: "RecommendedEvents",
        component: RecommendedView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/profile",
        name: "AccountProfile",
        component: AccountProfileView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/promoter",
        name: "PromoterProfile",
        component: PromoterProfile,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "MyEvents",
        component: MyEventsViews,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/clients-accounts",
        name: "ClientsAccounts",
        component: ClientsAccountsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/admins-accounts",
        name: "AdminsAccounts",
        component: AdminsAccountsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/review-events",
        name: "ReviewEvents",
        component: onReviewEventsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/review-events/:id",
        name: "Review",
        component: ReviewEventView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/review-my-event/:id",
        name: "ReviewMyEvent",
        component: EditMyEventView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) next();
      else next("/login");
    });
  } else {
    next();
  }
});

export default router;
