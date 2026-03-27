import { useDispatch } from "react-redux";
import { register, login, logout, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();

  const registerUser = async ({ username, email, password }) => {
    dispatch(setLoading(true));
    try {
      const response = await register(username, email, password);
      dispatch(setUser(response.user));
      return true;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message || error.toString()));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loginUser = async ({ email, password }) => {
    dispatch(setLoading(true));
    try {
      const response = await login(email, password);
      dispatch(setUser(response.user));
      return true;
    } catch (error) {
      dispatch(setError(error.response?.data?.message || error.message || error.toString()));
      return false;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logoutUser = async () => {
    dispatch(setLoading(true));
    try {
      await logout();
      dispatch(setUser(null));
    } catch (error) {
      dispatch(setError(error.message || error.toString()));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getMeUser = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getMe();
      dispatch(setUser(response.user));
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { registerUser, loginUser, logoutUser, getMeUser };
};
