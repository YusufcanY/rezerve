'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronsUpDown, ImageUpIcon, Loader2, Trash2, X } from 'lucide-react';
import classNames from 'classnames';
import Countries from '@/constants/countries.json';
import { useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Tag, TagInput } from 'emblor';
import { Badge } from '../ui/badge';
import stringSimilarity from 'string-similarity';
import { useMutation } from '@tanstack/react-query';
import HotelService from '@/service/hotel';
import { useRouter } from 'next/navigation';
import amenities from '@/constants/amenities';

const hotelFormSchema = z.object({
  name: z
    .string({ required_error: 'Please enter a name.' })
    .min(1, { message: 'Please enter a name.' }),
  location: z.object({
    country: z.string({ required_error: 'Please select a country.' }),
    city: z.string({ required_error: 'Please select a city.' }),
  }),
  description: z
    .string({ required_error: 'Please enter a description.' })
    .min(1, { message: 'Please enter a description.' }),
  rooms: z
    .array(
      z.object({
        name: z.string().min(1, { message: 'Please enter a name' }),
        price: z.number().min(1, { message: 'Please enter a valid price.' }),
        occupantCount: z.number().min(1, { message: 'Please enter a valid occupant count.' }),
        squareMeters: z.number().min(1, { message: 'Please enter a valid square meters.' }),
        amenities: z
          .array(
            z.object({
              id: z.string(),
              text: z.string(),
            }),
          )
          .min(1, { message: 'Please add at least one amenity.' }),
      }),
    )
    .min(1, { message: 'Please add at least one room.' }),
  images: z
    .array(
      z.object({
        value: z.custom<File>(),
      }),
    )
    .min(1, { message: 'Please add at least one image.' }),
});

const roomFormSchema = z.object({
  name: z.string({ required_error: 'Please enter a name' }),
  price: z.coerce
    .number({
      required_error: 'Please enter a price',
      invalid_type_error: 'Please enter a valid price',
    })
    .min(1, { message: 'Please enter a valid price.' }),
  occupantCount: z.coerce
    .number({
      required_error: 'Please enter a max guest count',
      invalid_type_error: 'Please enter a max guest count',
    })
    .min(1, { message: 'Please enter a valid occupant count.' }),
  squareMeters: z.coerce
    .number({
      required_error: 'Please enter a square meter',
      invalid_type_error: 'Please enter a square meter',
    })
    .min(1, { message: 'Please enter a valid square meters.' }),
  amenities: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      }),
    )
    .min(1, { message: 'Please add at least one amenity.' }),
});

type HotelFormValues = z.infer<typeof hotelFormSchema>;
type RoomFormValues = z.infer<typeof roomFormSchema>;

export default function AddHotelForm() {
  const router = useRouter();
  const [isNewRoomModalOpen, setNewRoomModalOpen] = useState(false);
  const [isCountryOpen, setCountryOpen] = useState(false);
  const [isCityOpen, setCityOpen] = useState(false);

  const getCities = useCallback((country: string) => {
    if (!country) return [];
    return Countries.find((c) => c.country === country)!.cities;
  }, []);
  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
  });
  const roomForm = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
  });
  const { fields, append, remove } = useFieldArray({
    name: 'rooms',
    control: form.control,
  });
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    name: 'images',
    control: form.control,
  });
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      appendImage(acceptedFiles.map((file) => ({ value: file })));
      form.trigger('images');
    },
    [form, appendImage],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections, open } =
    useDropzone({
      onDrop,
      maxFiles: 10,
      maxSize: 10 * 1024 * 1024,
      accept: {
        'image/jpeg': ['.jpg'],
        'image/png': ['.png'],
      },
    });
  const { mutateAsync: addHotel, isPending } = useMutation({
    mutationFn: HotelService.createHotel,
  });
  const { mutateAsync: addImagesToHotel, isPending: isAddImagesPending } = useMutation({
    mutationFn: HotelService.addImagesToHotel,
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

  const onSubmit = async (data: HotelFormValues) => {
    const { images, ...rest } = data;
    const rooms = rest.rooms.map((room) => ({
      ...room,
      amenities: room.amenities.map(
        (a) => amenities.find((amenity) => amenity.id === a.id)?.id || a.text,
      ),
    }));
    const a = {
      ...rest,
      rooms,
    };
    try {
      const resp = await addHotel(a);
      const hotelId = resp.hotel._id;
      const formData = new FormData();
      formData.append('cover', images[0].value);
      images.slice(1).forEach((image) => {
        formData.append('images', image.value);
      });
      await addImagesToHotel({ id: hotelId, body: formData });
      router.push(`/hotel/${hotelId}`);
    } catch (error) {}
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((d) => onSubmit(d))}
          className="mt-4 grid grid-cols-12 gap-4"
        >
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ramada Hotel & Spa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="location.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Popover open={isCountryOpen} onOpenChange={setCountryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <p className="truncate">
                            {field.value
                              ? Countries.find((country) => country.country === field.value)
                                  ?.country
                              : 'Select country...'}
                          </p>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {Countries.map((country) => (
                                <CommandItem
                                  key={country.iso3}
                                  value={country.country}
                                  onSelect={(currentValue) => {
                                    form.setValue(
                                      'location.country',
                                      currentValue === field.value ? '' : currentValue,
                                    );
                                    form.setValue('location.city', '');
                                    form.trigger('location.country');
                                    setCountryOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === country.country ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {country.country}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Popover open={isCityOpen} onOpenChange={setCityOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <p className="truncate">
                            {field.value && form.getValues('location.country')
                              ? field.value
                              : 'Select city...'}
                          </p>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search city..." />
                          <CommandList>
                            <CommandEmpty>No city found.</CommandEmpty>
                            <CommandGroup>
                              {getCities(form.getValues('location.country')).map((city) => (
                                <CommandItem
                                  key={city}
                                  value={city}
                                  onSelect={(currentValue) => {
                                    form.setValue(
                                      'location.city',
                                      currentValue === field.value ? '' : currentValue,
                                    );
                                    form.trigger('location.city');
                                    setCityOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      'mr-2 h-4 w-4',
                                      field.value === city ? 'opacity-100' : 'opacity-0',
                                    )}
                                  />
                                  {city}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Best Hotel in Town" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 flex flex-col items-start">
            <Label htmlFor="rooms" className="mb-2">
              Rooms
            </Label>
            {fields.length > 0 && (
              <div className="mb-4 grid grid-cols-3 gap-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col rounded-lg border border-border p-2">
                    <Image
                      src="/placeholder.svg"
                      width={400}
                      height={200}
                      alt="Placeholder"
                      className="mb-2 rounded-lg"
                    />
                    <span className="font-medium">
                      {field.name}
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {field.squareMeters} m²
                      </span>
                    </span>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">${field.price} / night</span>
                      <span className="text-sm text-muted-foreground">
                        {field.occupantCount} Guests
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => remove(index)}
                      className="mt-4 justify-center"
                      type="button"
                    >
                      <Trash2 className="h-4 w-4 fill-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <Button
              variant="outline"
              className="justify-center"
              type="button"
              size="sm"
              onClick={() => setNewRoomModalOpen(true)}
            >
              Add Room
            </Button>
            {form.formState.errors.rooms && (
              <span className="mt-2 text-sm text-destructive">
                {form.formState.errors.rooms.message}
              </span>
            )}
          </div>
          <div className="col-span-12">
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
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
                    <div className="mb-2 mt-4">
                      Drop or{' '}
                      <span
                        onClick={() => open()}
                        className="cursor-pointer text-primary hover:underline"
                      >
                        select
                      </span>
                    </div>
                    <span
                      className={classNames('absolute bottom-2 left-1/2 -translate-x-1/2 text-xs', {
                        'text-destructive': isDragReject || fileRejections.length > 0,
                        'text-muted-foreground': !isDragReject && !(fileRejections.length > 0),
                      })}
                    >
                      Max size: 10MB, JPG or PNG
                    </span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-2 grid grid-cols-5 gap-2">
              {imageFields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Image
                    src={URL.createObjectURL(field.value)}
                    alt="Hotel Image"
                    width={200}
                    height={100}
                    className="h-[100px] rounded-sm"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => removeImage(index)}
                    type="button"
                    className="w-full"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 flex justify-end">
            <Button type="submit" disabled={isPending || isAddImagesPending}>
              {(isPending || isAddImagesPending) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Publish
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={isNewRoomModalOpen} onOpenChange={setNewRoomModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Room</DialogTitle>
            <DialogDescription>
              Add a new room to your hotel listing. You can add multiple rooms.
            </DialogDescription>
          </DialogHeader>
          <Form {...roomForm}>
            <form
              onSubmit={roomForm.handleSubmit((d) => {
                append(d);
                roomForm.reset();
                setNewRoomModalOpen(false);
              })}
              className="grid grid-cols-2 gap-4"
            >
              <FormField
                control={roomForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Single" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={roomForm.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="50" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={roomForm.control}
                name="squareMeters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Meters</FormLabel>
                    <FormControl>
                      <Input placeholder="100" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={roomForm.control}
                name="occupantCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Guests</FormLabel>
                    <FormControl>
                      <Input placeholder="4" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={roomForm.control}
                name="amenities"
                defaultValue={[]}
                render={({ field }) => {
                  return (
                    <FormItem className="col-span-2">
                      <FormLabel className="text-left">Amenities</FormLabel>
                      <FormControl>
                        <TagInput
                          {...field}
                          placeholder="Enter a amenity"
                          tags={field.value}
                          setTags={(newTags) => {
                            roomForm.setValue('amenities', newTags as [Tag, ...Tag[]]);
                            roomForm.trigger('amenities');
                          }}
                          enableAutocomplete={
                            amenities.filter((tag) => !field.value.some((t) => t.id === tag.id))
                              .length > 0
                          }
                          autocompleteOptions={amenities.filter(
                            (tag) => !field.value.some((t) => t.id === tag.id),
                          )}
                          inputFieldPosition="top"
                          className="mb-2 h-10 shadow-none"
                          customTagRenderer={() => null}
                        />
                      </FormControl>
                      {field.value.map((tag) => (
                        <Badge variant="secondary" key={tag.id}>
                          {tag.text}{' '}
                          <X
                            className="ml-1 h-3 w-3 cursor-pointer fill-current"
                            onClick={() =>
                              roomForm.setValue(
                                'amenities',
                                field.value.filter((t) => t.id !== tag.id),
                              )
                            }
                          />
                        </Badge>
                      ))}
                      <FormMessage />
                      {field.value.length > 0 &&
                        field.value
                          .filter((tag) => amenities.find((a) => a.text === tag.text) === undefined)
                          .map((tag) => {
                            const result = stringSimilarity.findBestMatch(
                              tag.text,
                              amenities
                                .filter((a) => !field.value.some((t) => t.id === a.id))
                                .map((a) => a.text),
                            );
                            if (result.bestMatch.rating >= 0.4) {
                              const a = amenities.find((a) => a.text === result.bestMatch.target);
                              return (
                                <div key={tag.id}>
                                  {a && (
                                    <span className="text-xs text-muted-foreground">
                                      Did you mean:{' '}
                                      <span
                                        className="cursor-pointer text-primary underline"
                                        onClick={() =>
                                          roomForm.setValue(
                                            'amenities',
                                            field.value.map((t, i) => (t.id === tag.id ? a : t)),
                                          )
                                        }
                                      >
                                        {a.text}
                                      </span>
                                      ?
                                    </span>
                                  )}
                                </div>
                              );
                            }
                          })}
                    </FormItem>
                  );
                }}
              />
              <div className="col-span-2 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    roomForm.reset();
                    setNewRoomModalOpen(false);
                  }}
                  type="button"
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
