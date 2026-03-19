import { useQuery } from '@tanstack/react-query'
import { getDistricts, getProvinces, getWards } from '../checkout.service'

export default function useGetAddress({
    provinceId,
    districtId,
}: {
    provinceId: string
    districtId: string
}) {
    const { data: provinces } = useQuery({
        queryKey: ['provinces'],
        queryFn: getProvinces,
    })

    const { data: districts } = useQuery({
        queryKey: ['ditricts', provinceId],
        queryFn: () => getDistricts(provinceId),
        enabled: !!provinceId,
    })

    const { data: wards } = useQuery({
        queryKey: ['wards', districtId],
        queryFn: () => getWards(districtId),
        enabled: !!districtId,
    })

    return {
        provinces,
        districts,
        wards,
    }
}
