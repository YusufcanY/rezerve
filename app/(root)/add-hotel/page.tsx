'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AddHotel() {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, open } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1 * 1024 * 1024,
      accept: {
        'image/jpeg': [],
        'image/png': [],
        'image/webp': [],
      },
    });
  useEffect(() => {
    if (fileRejections.length > 0) {
      const errorType = fileRejections[0].errors[0].code;
      if (errorType === 'file-invalid-type') {
        toast.error('Wrong file type', {
          description: 'Please upload a file with the correct format',
        });
      } else if (errorType === 'file-too-large') {
        toast.error('File too large', {
          description: 'Please upload a file with the correct size',
        });
      } else {
        toast.error('Uh oh! Something went wrong.', {
          description: 'There was a problem with your request. Please try again',
        });
      }
    }
  }, [fileRejections]);
  return (
    <div className="container mx-auto py-4 lg:py-12">
      <h1 className="text-4xl font-bold">Add Your Hotel Listing</h1>
      <span className="text-muted-foreground">
        Fill out the form below to create a new hotel listing
      </span>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="mt-4 grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Ramada Hotel & Spa" />
          </div>
          <div className="col-span-5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="Istanbul, Turkiye" />
          </div>
          <div className="col-span-12">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Best Hotel in Town" />
          </div>
          <div className="col-span-6">
            <Label htmlFor="rooms">Rooms</Label>
            <Input id="rooms" placeholder="single,deluxe" />
            <span className="text-sm text-muted-foreground">
              You can seperate room types with comma (,)
            </span>
          </div>
          <div className="col-span-6">
            <Label htmlFor="price">Price ($)</Label>
            <Input id="price" placeholder="100" />
          </div>
          <div className="col-span-12">
            <Label htmlFor="images">Images</Label>
            <div
              className={classNames(
                'relative flex flex-col items-center justify-center rounded-lg border border-dashed px-4 py-10',
                {
                  'border-green-500 bg-green-500/10': isDragActive && !isDragReject,
                  'border-destructive bg-destructive/10': isDragActive && isDragReject,
                  'border-border bg-card': !isDragActive,
                },
              )}
              {...getRootProps()}
            >
              <input {...getInputProps()} id="images" />
              <ImageUpIcon className="h-12 w-12 fill-primary/75" />
              {file ? (
                <>
                  <span className="mb-2 mt-4">{file.name}</span>
                  <Button onClick={() => setFile(null)} variant="destructive" size="sm">
                    Remove
                  </Button>
                </>
              ) : (
                <>
                  <div className="mb-2 mt-4">
                    Drop or{' '}
                    <span
                      onClick={() => open()}
                      className="cursor-pointer text-primary hover:underline"
                    >
                      select
                    </span>
                  </div>
                </>
              )}
              <span
                className={classNames('absolute bottom-2 left-1/2 -translate-x-1/2 text-xs', {
                  'text-destructive': isDragReject || fileRejections.length > 0,
                  'text-muted-foreground': !isDragReject && !(fileRejections.length > 0),
                })}
              >
                Max size: 25MB, JPG or PNG
              </span>
            </div>
          </div>
        </div>
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
