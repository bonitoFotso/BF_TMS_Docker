import { render } from "../preset/react.js";
export const bridgeData = {
    "workspaceFolder": "file:///home/bonito/Documents/Prog/Stage/BF_TMS_Docker",
    "serverRootDir": "",
    "previewFolderRelPath": "preview",
    "activeFileRelPath": "frontend/src/views/taches/liste/component/TaskForm.jsx",
    "mapFileRelPath": "frontend/src/views/taches/liste/component/TaskForm.jsx",
    "presetName": "react",
    "workspaceFolderName": "BF_TMS_Docker"
};
export const preview = () => render(getMod);
const getMod = () => import("../../frontend/src/views/taches/liste/component/TaskForm.jsx");