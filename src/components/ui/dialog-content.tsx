import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ContentViewerProps {
  trigger: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
  type: 'text' | 'image' | 'audio' | 'video' | 'model';
  url?: string;
}

export const ContentViewer = ({ trigger, title, content, type, url }: ContentViewerProps) => {
  const [open, setOpen] = useState(false);

  console.log('ContentViewer rendered', { title, open });

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      console.log('Dialog onOpenChange', newOpen);
      setOpen(newOpen);
    }}>
      <DialogTrigger asChild onClick={() => {
        console.log('DialogTrigger clicked');
        setOpen(true);
      }}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-background border-cracra-green">
        <DialogHeader>
          <DialogTitle className="text-cracra-green text-2xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {type === 'text' && (
            <div className="whitespace-pre-wrap text-foreground p-4 bg-muted rounded-lg">
              {content}
            </div>
          )}
          {type === 'image' && url && (
            <div className="flex justify-center">
              <img 
                src={url} 
                alt={title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>
          )}
          {type === 'audio' && url && (
            <div className="flex justify-center p-4">
              <audio controls className="w-full max-w-md">
                <source src={url} type="audio/mpeg" />
                Votre navigateur ne supporte pas l'audio.
              </audio>
            </div>
          )}
          {type === 'video' && url && (
            <div className="flex justify-center">
              <video 
                controls 
                className="max-w-full max-h-[70vh] rounded-lg"
                src={url}
              >
                Votre navigateur ne supporte pas la vidéo.
              </video>
            </div>
          )}
          {type === 'model' && url && (
            <div className="text-center p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground mb-4">Modèle 3D</p>
              <Button 
                className="bg-cracra-green hover:bg-cracra-purple"
                onClick={() => window.open(url, '_blank')}
              >
                TÉLÉCHARGER LE MODÈLE
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface EditFormProps {
  trigger: React.ReactNode;
  title: string;
  initialData: any;
  onSave: (data: any) => void;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'file';
    accept?: string;
    required?: boolean;
  }>;
}

export const EditForm = ({ trigger, title, initialData, onSave, fields }: EditFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, ...files });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-background border-cracra-yellow">
        <DialogHeader>
          <DialogTitle className="text-cracra-yellow">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={field.name}>
              <Label htmlFor={field.name} className="text-foreground">
                {field.label}
              </Label>
              {field.type === 'text' && (
                <Input
                  id={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  required={field.required}
                  className="mt-1"
                />
              )}
              {field.type === 'textarea' && (
                <Textarea
                  id={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  required={field.required}
                  className="mt-1 min-h-[100px]"
                />
              )}
              {field.type === 'file' && (
                <Input
                  id={field.name}
                  type="file"
                  accept={field.accept}
                  onChange={(e) => setFiles(prev => ({ ...prev, [field.name]: e.target.files?.[0] || null }))}
                  className="mt-1"
                />
              )}
            </div>
          ))}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-cracra-yellow text-black hover:bg-cracra-green"
            >
              Sauvegarder
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};