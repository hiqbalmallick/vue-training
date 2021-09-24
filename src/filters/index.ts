import { capitalize, currencySymbol } from "@/utils/utils";
import Vue from "vue";

Vue.filter("capitalize", capitalize);
Vue.filter("currencySymbol", currencySymbol);
