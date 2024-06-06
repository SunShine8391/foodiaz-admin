import { DEFAULT_PAGE_SIZE } from "@/config";
import { Unsubscribe } from "firebase/auth";
import {
  DocumentData,
  QueryConstraint,
  QueryFieldFilterConstraint,
  QueryLimitConstraint,
  QueryOrderByConstraint,
  QueryStartAtConstraint,
  WhereFilterOp,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { groupBy } from "lodash";
import { db } from "./firebase";

export const getDocumentData = (
  collection: string,
  docID: string,
  callback: (values: Record<string, any> | null) => void
) => {
  const docRef = doc(db, collection, docID);
  const unsubscribe = onSnapshot(docRef, (documentSnapshot) => {
    if (documentSnapshot.exists()) {
      const documentData = {
        id: documentSnapshot.id,
        ...documentSnapshot.data(),
      };
      callback(documentData);
    } else {
      // console.log('Document does not exist.', collection, docID);
      callback(null);
    }
  });
  return unsubscribe;
};

export const getDocumentDataWithoutSnapshot = async (
  collection: string,
  docID: string,
  callback: (values: Record<string, any> | null) => void
) => {
  try {
    const docRef = doc(db, collection, docID);
    const document = await getDoc(docRef);

    if (document.exists()) {
      const documentData = { ...document.data() };
      callback(documentData);
      return documentData;
    } else {
      // console.log('Document does not exist.', collection, docID);
      callback(null);
      return null;
    }
  } catch (error) {
    console.error("Error fetching document data:", error);
  }
  return null;
};

export const dbQuery = async (
  collec: string,
  docID: string,
  callback: (values: Record<string, any> | null, sub: Unsubscribe) => void,
  fieldName = "members",
  condition: WhereFilterOp = "array-contains-any"
) => {
  const sub = onSnapshot(
    query(collection(db, collec), where(fieldName, condition, docID)),
    (streamCollection) => {
      const response: Record<string, any> | DocumentData[] | null = [];
      streamCollection.forEach((docu) => {
        response.push(docu.data());
      });
      callback(response, sub);
    }
  );
};

export const getUsersByPagination = async (
  path: string,
  page: number,
  pageSize?: number,
  filters?: QueryFieldFilterConstraint[],
  orderBy?: QueryOrderByConstraint[],
  startAt?: QueryStartAtConstraint[],
  limit?: QueryLimitConstraint[]
) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, path),
      ...(filters ?? []),
      ...(orderBy ?? []),
      ...(startAt ?? []),
      ...(limit ?? [])
    )
  );
  const data = querySnapshot.docs.map<DocumentData>((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  const start = pageSize ? (page - 1) * pageSize : 0;
  const end = pageSize ? start + pageSize : data.length;

  return {
    total: data.length,
    data: data.slice(start, end),
    regions: Object.keys(groupBy(data, "region")).filter(
      (item) => item !== "" && item !== "undefined"
    ),
    devices: Object.keys(groupBy(data, "device_type")).filter(
      (item) => item !== "" && item !== "undefined"
    ),
  };
};

export const getDocuments = async (
  path: string,
  filters: QueryFieldFilterConstraint[],
  orderBy: QueryOrderByConstraint[],
  startAt: QueryStartAtConstraint[],
  limit: QueryLimitConstraint[],
  callback: (
    response: Record<string, any> | DocumentData[],
    sub: Unsubscribe
  ) => void
) => {
  const sub = onSnapshot(
    query(collection(db, path), ...filters, ...orderBy, ...startAt, ...limit),
    (streamCollection) => {
      const response: Record<string, any> | DocumentData[] | null = [];
      streamCollection.forEach((docu) => {
        response.push(docu.data());
      });
      callback(response, sub);
    }
  );
};

export const deleteDocument = async (collec: string, docID: string) =>
  new Promise((resolve, reject) => {
    const docRef = doc(db, collec, `${docID}`);
    deleteDoc(docRef)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        reject(error);
      });
  });

export const getUsersByFilter = async (...filters: QueryConstraint[]) => {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), ...filters, limit(DEFAULT_PAGE_SIZE))
  );
  const data = querySnapshot.docs.map<DocumentData>((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
};

export const getUsersCount = async (filters?: QueryFieldFilterConstraint[]) => {
  const documents = await getCountFromServer(
    query(collection(db, "users"), ...(filters ?? []))
  );

  return documents.data().count;
};
