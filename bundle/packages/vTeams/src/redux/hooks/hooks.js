import {
  createDispatchHook,
  createSelectorHook,
} from '../../../node_modules/react-redux';
import { context } from '../store';

export const useSelector = createSelectorHook(context);
export const useDispatch = createDispatchHook(context);
