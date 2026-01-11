import JSZip from 'jszip';
import { TerraformProject, TerraformFile } from './terraform-generator';
import { PulumiProject, PulumiFile, PulumiLanguage } from './pulumi-generator';

export interface ZipExportResult {
  blob: Blob;
  filename: string;
}

export async function exportTerraformZip(
  project: TerraformProject,
  projectName: string = 'terraform-project'
): Promise<ZipExportResult> {
  const zip = new JSZip();

  // Add all files to the ZIP
  project.files.forEach((file: TerraformFile) => {
    // Handle nested paths (e.g., modules/ec2/main.tf)
    zip.file(file.path, file.content);
  });

  // Generate the ZIP blob
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const filename = `${sanitizedName}-terraform.zip`;

  return { blob, filename };
}

export async function exportPulumiZip(
  project: PulumiProject,
  projectName: string = 'pulumi-project',
  language: PulumiLanguage = 'typescript'
): Promise<ZipExportResult> {
  const zip = new JSZip();

  // Add all files to the ZIP
  project.files.forEach((file: PulumiFile) => {
    // Handle nested paths (e.g., components/ec2.ts or components/ec2.py)
    zip.file(file.path, file.content);
  });

  // Generate the ZIP blob
  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 }
  });

  const sanitizedName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const langSuffix = language === 'python' ? 'py' : 'ts';
  const filename = `${sanitizedName}-pulumi-${langSuffix}.zip`;

  return { blob, filename };
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
