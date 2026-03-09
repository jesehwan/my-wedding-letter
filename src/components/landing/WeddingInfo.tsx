interface WeddingInfoProps {
  date: string;
  time: string;
  venue: string;
  address: string;
}

export function WeddingInfo({ date, time, venue, address }: WeddingInfoProps) {
  return (
    <div className="space-y-3 text-center text-gray-600">
      <div>
        <p className="text-lg">{date}</p>
        <p className="text-lg">{time}</p>
      </div>
      <div>
        <p className="text-lg font-medium text-gray-800">{venue}</p>
        <p className="text-sm">{address}</p>
      </div>
    </div>
  );
}
