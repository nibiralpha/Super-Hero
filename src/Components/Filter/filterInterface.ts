import { FilterListItems } from "../../model/Filter.model";
type SupportedObjectKeysList = Record<FilterListItems, string>
type SupportedObjectKeys = Partial<SupportedObjectKeysList>

export default SupportedObjectKeys