import {Topic} from "./Topic";
import {User} from "./User";

export class ProfileConfiguration {
    id?: number;
    preferredTopics?: Topic[];
    languageSkillsConfig?: any;
    owner?: User;
}
