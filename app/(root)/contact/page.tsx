import ContactForm from '@/components/form/ContactForm';

export default function Contact() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 md:px-0 md:py-20">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Get in Touch</h1>
        <p className="mx-auto max-w-md text-muted-foreground dark:text-gray-400">
          Have a question or want to work together? Fill out the form below and we&apos;ll get back
          to you as soon as possible.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
