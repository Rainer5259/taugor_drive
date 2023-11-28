// import {fetchUserData} from '../thunks/fetchUserData';
import {User} from 'firebase/auth';
import {userGoogleData} from '../thunks/fetchUserData';

export interface UserProps {
  id: string;
  token: string;
}
