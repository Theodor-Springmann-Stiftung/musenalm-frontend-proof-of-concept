import { writable } from "svelte/store";
import ApiClient    from "@/utils/ApiClient";
import CommonHelper from "@/utils/CommonHelper";
import collections_user from "@/collections_user";
import collections_viewdata from "@/collections_viewdata";

export const collections                    = writable([]);
export const activeCollection               = writable({});
export const isCollectionsLoading           = writable(false);
export const protectedFilesCollectionsCache = writable({});

export function changeActiveCollectionById(collectionId) {
    collections.update((list) => {
        const found = CommonHelper.findByKey(list, "id", collectionId);

        if (found) {
            activeCollection.set(found);
        } else if (list.length) {
            activeCollection.set(list[0]);
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
        let items = collections_user;
        items = CommonHelper.sortCollections(items);
        items = CommonHelper.mergeCollection(items, collections_viewdata);
        collections.set(items);

        const item = activeId && CommonHelper.findByKey(items, "id", activeId);
        if (item) {
            activeCollection.set(item);
        } else if (items.length) {
            activeCollection.set(items[0]);
        }

        refreshProtectedFilesCollectionsCache();
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
