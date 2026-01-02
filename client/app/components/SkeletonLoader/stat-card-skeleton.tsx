import { Skeleton } from "@/app/components/ui/skeleton";
import { StyleConfig } from "@/app/models/resusable.model";

export interface StatCardSkeletonProps {
  styles?: {
    lableStyles?: StyleConfig;
    IconContainerStyle?: StyleConfig;
    IconStyle?: StyleConfig;
    valueStyle?: StyleConfig;
    cardStyle?: StyleConfig;
    containerStyle?: StyleConfig;
  };
}

const StatCardSkeleton: React.FC<StatCardSkeletonProps> = ({ styles = {} }) => {
  return (
    <div
      className={`bg-white w-full rounded-xl p-5 border border-gray-200 shadow-sm ${styles?.cardStyle?.className}`}
      style={styles?.cardStyle?.inlineStyles || {}}
    >
      <div
        className={`flex items-center justify-between mb-2 ${styles?.containerStyle?.className}`}
        style={styles?.containerStyle?.inlineStyles || {}}
      >
        <Skeleton
          className={`h-4 w-24 ${styles?.lableStyles?.className}`}
          style={styles?.lableStyles?.inlineStyles || {}}
        />
        <Skeleton
          className={`w-10 h-10 rounded-lg ${styles?.IconContainerStyle?.className}`}
          style={styles?.IconContainerStyle?.inlineStyles || {}}
        />
      </div>
      <Skeleton
        className={`h-9 w-16 ${styles?.valueStyle?.className}`}
        style={styles?.valueStyle?.inlineStyles || {}}
      />
    </div>
  );
};

export default StatCardSkeleton;
