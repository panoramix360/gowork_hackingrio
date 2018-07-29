import UserStore from './userStore';
import MapStore from './mapStore';


const userStore = new UserStore();
const mapStore = new MapStore();

export default {
  user: userStore,
  map: mapStore
};
