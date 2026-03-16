import { CoupleInfo, Parent } from "@/types/wedding";

interface FamilyInfoProps {
  couple: CoupleInfo;
}

function ParentRow({ parent }: { parent: Parent }) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-600">
      <span className="text-sm text-gray-400">{parent.role}</span>
      <span>{parent.name}</span>
      <a
        href={`tel:${parent.phone}`}
        aria-label={`${parent.name}에게 전화하기`}
        className="text-gray-400 transition-colors hover:text-gray-600"
      >
        📞
      </a>
    </div>
  );
}

function FamilySide({
  label,
  name,
  parents,
}: {
  label: string;
  name: string;
  parents: Parent[];
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-gray-700">{name}</p>
      <div className="flex flex-col gap-1">
        {parents.map((parent) => (
          <ParentRow key={parent.role} parent={parent} />
        ))}
      </div>
    </div>
  );
}

export function FamilyInfo({ couple }: FamilyInfoProps) {
  return (
    <div className="mt-8 w-full max-w-md text-center">
      <h2 className="mb-6 text-sm uppercase tracking-widest text-gray-400">
        혼주 안내
      </h2>
      <div className="flex justify-center gap-12">
        <FamilySide
          label="신랑 측"
          name={couple.groomName}
          parents={couple.groomParents}
        />
        <FamilySide
          label="신부 측"
          name={couple.brideName}
          parents={couple.brideParents}
        />
      </div>
    </div>
  );
}
