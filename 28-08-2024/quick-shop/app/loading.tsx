import SkeletonCard from '@/components/SkeletonCard'

const homeCard: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]


const loading = () => {
    return (
        <div className=" flex-wrap">
            {homeCard.map((n) => (
                <SkeletonCard key={n} />
            ))}
        </div>
    );
};


export default loading