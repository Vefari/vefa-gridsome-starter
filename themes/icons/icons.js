// see about creating a yaml file to include these and ease injection

import AddEntry from "@icons/AddEntry.svg"
import AddEvent from "@icons/AddEvent.svg"
import AddMemberGroup from "@icons/AddMemberGroup.svg"
import AddNewsEntry from "@icons/AddNewsEntry.svg"
import AddUser from "@icons/AddUser.svg"
import CancelAction from "@icons/CancelAction.svg"
import DeleteAction from "@icons/DeleteAction.svg"
import DownloadAsset from "@icons/DownloadAsset.svg"
import ExternalLink from "@icons/ExternalLink.svg"
import MenuAction from "@icons/MenuAction.svg"
import PreviewComment from "@icons/PreviewComment.svg"
import PublishSite from "@icons/PublishSite.svg"
import SaveAction from "@icons/SaveAction.svg"
// import SendMessage from "@icons/SendMessage.svg"
import UploadAsset from "@icons/UploadAsset.svg"


export default function (Vue) {
    Vue.component("AddEntry", AddEntry)
    Vue.component("AddEvent", AddEvent)
    Vue.component("AddMemberGroup", AddMemberGroup)
    Vue.component("AddNewsEntry", AddNewsEntry)
    Vue.component("AddUser", AddUser)
    Vue.component("CancelAction", CancelAction)
    Vue.component("DeleteAction", DeleteAction)
    Vue.component("DownloadAsset", DownloadAsset)
    Vue.component("ExternalLink", ExternalLink)
    Vue.component("MenuAction", MenuAction)
    Vue.component("PreviewComment", PreviewComment)
    Vue.component("PublishSite", PublishSite)
    Vue.component("SaveAction", SaveAction)
    // Vue.component("SendMessage", SendMessage)
    Vue.component("UploadAsset", UploadAsset)
}
