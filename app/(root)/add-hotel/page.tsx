import AddHotelForm from '@/components/form/AddHotelForm';

export default function AddHotel() {
  return (
    <div className="container mx-auto py-4 lg:py-12">
      <h1 className="text-4xl font-bold">Add Your Hotel Listing</h1>
      <span className="text-muted-foreground">
        Fill out the form below to create a new hotel listing
      </span>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <AddHotelForm />
        <div className="hidden lg:block">
          <div className="relative">
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ea70e4121495337.60c75de12983c.jpg"
              className="rounded-md shadow-lg"
              alt=""
            />
            <h3 className="absolute left-0 top-0 p-8 text-6xl font-black tracking-wide text-black">
              Isn&apos;t it beautiful to share your{' '}
              <div className="relative inline-block h-[52px] w-48 text-primary">
                <span
                  className="absolute opacity-0"
                  style={{
                    animation: 'slideIn 12s forwards infinite',
                  }}
                >
                  hotel
                </span>
                <span
                  className="absolute opacity-0"
                  style={{
                    animation: 'slideIn 12s 4s forwards infinite',
                  }}
                >
                  room
                </span>
                <span
                  className="absolute opacity-0"
                  style={{
                    animation: 'slideIn 12s 8s forwards infinite',
                  }}
                >
                  house
                </span>
              </div>{' '}
              with the world?
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
