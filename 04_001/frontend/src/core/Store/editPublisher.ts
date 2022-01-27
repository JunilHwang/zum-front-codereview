import { initMainState, MainPublisherState, Publisher } from ".";
import { PostData } from "@common/types";
import { execFetch, getParseLocalItem, removeLocalItem, setConvertLocalItem } from "@src/utils/functions";

export interface EditPublisherState {
  editData: PostData;
  isEdited: boolean;
}

export const initEditState: Readonly<EditPublisherState> = {
  editData: {
    id: null,
    subject: null,
    author: null,
    createdDate: null,
    contents: null,
  },
  isEdited: false,
};

export const LOCAL_EDIT_KEY = "zum_board_edit";

function isResetEditLocalState(): boolean {
  const { origin, pathname } = new URL(window.location.href);
  const mainLocalState = getParseLocalItem<MainPublisherState>(LOCAL_EDIT_KEY);
  const editId = mainLocalState?.editId;
  const isNeedReset = !editId || editId === initMainState.editId || pathname !== "/edit";
  if (isNeedReset) {
    window.history.pushState({ origin }, "", origin);
    removeLocalItem(LOCAL_EDIT_KEY);
  }
  return isNeedReset;
}

function getLocalEditPublisherState(): EditPublisherState | null {
  const isReset = isResetEditLocalState();
  if (isReset) return null;

  const state = getParseLocalItem<EditPublisherState>(LOCAL_EDIT_KEY);
  if (!state) return null;
  const { createdDate } = state.editData;
  if (typeof createdDate === "string") state.editData.createdDate = new Date(createdDate);
  return state;
}

const setStateCallback = () => setConvertLocalItem(LOCAL_EDIT_KEY, editPublisher.state);
export const editPublisher: Publisher<EditPublisherState> = new Publisher(
  getLocalEditPublisherState() ?? { ...initEditState },
  setStateCallback
);
