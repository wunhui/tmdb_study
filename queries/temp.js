import { getPageData, getTempData, updateTempData } from "@api/api";
import { QueryKeys } from "@lib/renderHelper";
import { useCustomInfinite, useCustomMutation, useCustomQuery } from "@utils/hooks";

// 임시데이터 요청
const useTempData = (options = {}, params) => {
	const queryParams = params;
	return useCustomQuery({
		queryKey: [QueryKeys.임시파일, queryParams],
		queryFn: async () => {
			const data = await getTempData(queryParams);
			return data;
		},
		...options,
	});
};

// 무한스크롤 요청
const usePageData = (options = {}, params) => {
	return useCustomInfinite({
		queryKey: [QueryKeys.무한스크롤데이터, params],
		queryFn: async ({ pageParam = 1 }) => {
			const data = await getPageData({ ...params, page: pageParam });
			return data;
		},
		getNextPageParam: (lastPage) => {
			const lastPageLength = lastPage.result.length;
			if (lastPageLength < params.limit) {
				return undefined;
			} else {
				return lastPage.pageInfo.currentPage + 1;
			}
		},
		...options,
	});
};

// 임시데이터 업데이트
const useUpdateTempData = () => {
	return useCustomMutation({
		mutationFn: updateTempData,
	});
};

const TempQuery = {
	useTempData,
	usePageData,
	useUpdateTempData,
};

export default TempQuery;
