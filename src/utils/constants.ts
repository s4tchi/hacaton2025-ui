export const mapState = {
   center: [47.202094, 38.936400], 
   zoom: 20 
};


export enum EditType {
   ADD_MARKER = 'add_marker',
   REMOVE_MARKER = 'remove_marker',
}

export const EDIT_TYPE_STATE: Record<EditType, boolean> = {
   [EditType.ADD_MARKER]: false,
   [EditType.REMOVE_MARKER]: false,
}


export const initializeYMapsParams = {
   apikey: '0f413fe4-a78e-4d59-9e85-8f8df1924448',
};