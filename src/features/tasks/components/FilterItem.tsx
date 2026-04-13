import { SurfaceRow } from "../../../components/ui/surface/SurfaceItem";

type FitlerItemProps = {
  label: string;
  icon?: React.ReactNode;
  onFilter: () => void;
};

export function FilterItem({ icon, label, onFilter }: FitlerItemProps) {
  return (
    <SurfaceRow onClick={onFilter}>
      {icon}
      <span className="font-light">{label}</span>
    </SurfaceRow>
  );
}
