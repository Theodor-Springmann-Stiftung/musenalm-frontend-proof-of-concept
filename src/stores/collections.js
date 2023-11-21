import { writable } from "svelte/store";
import ApiClient from "@/utils/ApiClient";
import CommonHelper from "@/utils/CommonHelper";
import page_viewdata from "@/page_viewdata";

export const collections = writable([]);
export const userCollection = writable([]);
export const pageCollection = writable({});
export const activeCollection = writable({});
export const isCollectionsLoading = writable(false);
export const protectedFilesCollectionsCache = writable({});
export const crossReferences = writable([]);

export function changeActiveCollectionById(collectionId) {
    collections.update((list) => {
        const found = CommonHelper.findByKey(list, "id", collectionId);

        if (found) {
            activeCollection.set(found);
            crossReferences.set(CommonHelper.enrichCrossReferences(found.name, list));
        } else if (list.length) {
            activeCollection.set(list[0]);
            crossReferences.set(CommonHelper.enrichCrossReferences(list[0].name, list));
        }

        return list;
    });
}

export function setActiveCollectionByObject(collectionObject) {
    if (collectionObject) {
        activeCollection.set(collectionObject);
    }
}

// load all collections (excluding the user profile)
export async function loadCollections(activeId = null) {
    isCollectionsLoading.set(true);

    try {
        let result = await ApiClient.send('/api_ext/collections');
        let items = CommonHelper.sortCollections(result);
        let c = CommonHelper.loadMergeViewDataOfAll(items.base);
        collections.set(c);

        let i = CommonHelper.mergeCollection(items.page[0], page_viewdata);
        let m = CommonHelper.mergeCollection(items.page[1], i);
        pageCollection.set(m);

        const item = activeId && CommonHelper.findByKey(c, "id", activeId);
        if (item) {
            activeCollection.set(item);
        } else if (c.length) {
            activeCollection.set(c[0]);
        }

        refreshProtectedFilesCollectionsCache();
    } catch (err) {
        ApiClient.error(err);
    }

    try {
        let user_collection = await ApiClient.send('/api_ext/users_collection');
        userCollection.set(user_collection);
    } catch (err) {
        ApiClient.error(err);
    }

    isCollectionsLoading.set(false);
}

function refreshProtectedFilesCollectionsCache() {
    protectedFilesCollectionsCache.update((cache) => {
        collections.update((current) => {
            for (let c of current) {
                cache[c.id] = !!c.schema?.find((f) => f.type == "file" && f.options?.protected);
            }

            return current;
        });

        return cache;
    });
}
