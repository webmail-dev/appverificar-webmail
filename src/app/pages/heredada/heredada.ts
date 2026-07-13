import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { InspectionService } from '../../services/inspection.service';
import { SharedService } from '../../services/shared.service';
import { Inspection } from '../../models/inspection.model';
import { SignaturePadComponent, NgSignaturePadOptions } from '@almothafar/angular-signature-pad';

const INHERITED_FORM_FIELDS = [
    'propietario',
    'documento_propietario',
    'nombre_transportadora',
    'fecha_vencimiento_licencia',
    'soat',
    'licencia_transito',
    'revision_tecnomecanica',
];

const INHERITED_PAYLOAD_FIELDS = [
    'fecha_inspeccion',
    'fecha_vigencia',
    'telefono',
    'whatsapp',
    'propietario',
    'documento_propietario',
    'tipo_propietario',
    'nombre_transportadora',
    'fecha_vencimiento_licencia',
    'placa',
    'marca',
    'modelo',
    'kilometraje',
    'soat',
    'licencia_transito',
    'revision_tecnomecanica',
    'clase_vehiculo',
    'tarjeta_operacion',
    'color',
    'codigo_vehiculo',
    'capacidad_pasajeros',
    'fecha_vencimiento_soat',
    'fecha_vencimiento_revision_tecnomecanica',
    'fecha_vencimiento_tarjeta_operacion',
    'luces_navegacion',
    'luces_frenado',
    'luces_direccionales',
    'luz_reversa',
    'luces_estacionamiento',
    'luces_posicion',
    'luz_antineblina',
    'luz_placa',
    'tablero_instrumentos',
    'bocina',
    'bateria',
    'aire_acondicionado',
    'aceite_motor',
    'aceite_transmision',
    'liquido_refrigerante',
    'liquido_frenos',
    'filtro_aire',
    'hidraulico_direccion',
    'tension_correas',
    'parachoque_delantero',
    'parachoque_trasero',
    'vidrios_seguridad',
    'vidrios_laterales',
    'limpia_brisas',
    'guardabarros',
    'estribos_laterales',
    'placa_adhesivo',
    'chapa_compuerta',
    'tapiceria',
    'manijas_seguros',
    'vidrios_electricos',
    'antideslizantes_pedales',
    'tablero_instrumentos_interno',
    'abs',
    'espejos_laterales',
    'espejo_interno',
    'freno_mano_seguridad',
    'cinturones_seguridad',
    'airbags',
    'cadena_sujecion',
    'columna_direccion',
    'apoyacabezas',
    'barra_antivuelco',
    'rejilla_vidrio_trasero',
    'conos_triangular',
    'botiquin',
    'extintor',
    'cunas',
    'llanta_repuesto',
    'caja_herramientas',
    'linterna',
    'gato',
    'buies_barra',
    'buies_tiera',
    'cuna_motor',
    'guardapolvo_axiales',
    'amortiguadores',
    'hojas_muelles',
    'silenciadores',
    'tanques_compresor',
    'llanta_di',
    'llanta_dd',
    'llanta_tie',
    'llanta_tde',
    'llanta_tii',
    'llanta_tdi',
    'presion_llanta_d_li',
    'presion_llanta_d_ld',
    'presion_llanta_t_lie',
    'presion_llanta_t_lde',
    'presion_llanta_t_lii',
    'presion_llanta_t_ldi',
    'pedal_frenos',
    'bomba_frenos',
    'caja_deposito',
    'terminales',
    'barras_bujes',
    'protectores',
    'observaciones',
];

const FORBIDDEN_INHERITED_FIELDS = [
    'id',
    'numero_certificado',
    'estado',
    'created',
    'updated',
    'collectionId',
    'collectionName',
    'expand',
    'firma_conductor',
    'firma_inspector',
];
@Component({
    selector: 'app-heredada',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule, SignaturePadComponent],
    templateUrl: './heredada.html',
    styleUrl: './heredada.scss',
})
export class Heredada {
    driverForm: FormGroup;
    inheritedForm: FormGroup;
    isLoading = false;
    nextCertificateNumber = '';
    baseInspection: Inspection | null = null;
    firmaBase64: string | null = null;
    firmaInspectorBase64: string | null = null;
    signaturePadOptions: NgSignaturePadOptions = {
        minWidth: 2,
        maxWidth: 5,
        penColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        throttle: 16,
        minDistance: 5
    };
    @ViewChild('signaturePad')
    signaturePad!: SignaturePadComponent;
    @ViewChild('signaturePadInspector')
    signaturePadInspector!: SignaturePadComponent;
    @ViewChild('signaturePad', { read: ElementRef })
    signaturePadElement!: ElementRef<HTMLCanvasElement>;
    @ViewChild('signaturePadInspector', { read: ElementRef })
    signaturePadInspectorElement!: ElementRef<HTMLCanvasElement>;
    constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private inspectionService: InspectionService, public sharedService: SharedService) {
        this.driverForm = this.fb.group({
            nombres_conductor: ['', [Validators.required, Validators.minLength(3)]],
            identificacion: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        });
        this.inheritedForm = this.fb.group(INHERITED_FORM_FIELDS.reduce((controls: Record<string, any>, field) => {
            controls[field] = [''];
            return controls;
        }, {}));
    }
    async ngOnInit(): Promise<void> {
        this.sharedService.currentRoute = this.route.snapshot.url[0]?.path || 'heredada';
        try {
            this.nextCertificateNumber = await this.inspectionService.getNextCertificateNumberPreview('U');
        }
        catch (error) {
            console.error('Error al obtener preview del número de certificado:', error);
        }
        const stateInspection = history.state?.inheritedInspection;
        if (!stateInspection) {
            await Swal.fire({
                title: 'Sin datos base',
                text: 'No se recibió una inspección base para heredar.',
                icon: 'warning',
                confirmButtonText: 'Volver'
            });
            this.router.navigate(['/home']);
            return;
        }
        this.baseInspection = await this.resolveBaseInspection(stateInspection);
        this.patchInheritedForm(this.baseInspection);
        this.driverForm.patchValue({
            nombres_conductor: this.baseInspection.nombres_conductor || '',
            identificacion: this.baseInspection.identificacion || '',
        });
    }
    private async resolveBaseInspection(stateInspection: Inspection): Promise<Inspection> {
        if (!stateInspection.id) {
            return { ...stateInspection };
        }
        try {
            return await firstValueFrom(this.inspectionService.getInspectionById(stateInspection.id));
        }
        catch (error) {
            console.warn('No se pudo cargar la inspección completa; se usará el Router state recibido:', error);
            return { ...stateInspection };
        }
    }
    private patchInheritedForm(inspection: Inspection): void {
        this.inheritedForm.patchValue(this.pickFields(inspection, INHERITED_FORM_FIELDS));
    }
    private pickFields(source: Record<string, any>, fields: string[]): Record<string, any> {
        return fields.reduce((payload: Record<string, any>, field) => {
            const value = source[field];
            if (value !== undefined && value !== null) {
                payload[field] = value;
            }
            return payload;
        }, {});
    }
    private removeForbiddenFields(payload: Record<string, any>): void {
        FORBIDDEN_INHERITED_FIELDS.forEach((field) => delete payload[field]);
    }
    ngAfterViewInit(): void {
        setTimeout(() => {
            this.initSignaturePads();
            this.resizeCanvas(this.signaturePadElement, this.signaturePad);
            this.resizeCanvas(this.signaturePadInspectorElement, this.signaturePadInspector);
        }, 0);
    }
    private initSignaturePads(): void {
        try {
            if (this.signaturePad) {
                this.signaturePad.set('minWidth', 2);
                this.signaturePad.set('maxWidth', 5);
            }
            if (this.signaturePadInspector) {
                this.signaturePadInspector.set('minWidth', 2);
                this.signaturePadInspector.set('maxWidth', 5);
            }
        }
        catch (error) {
            console.warn('Error al inicializar los pads de firma:', error);
        }
    }
    private resizeCanvas(canvasRef: ElementRef<HTMLCanvasElement>, pad: SignaturePadComponent): void {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        const canvas = canvasRef?.nativeElement?.querySelector?.('canvas') || canvasRef?.nativeElement;
        if (!canvas)
            return;
        const data = pad?.toData?.();
        const container = canvas.parentElement;
        if (!container)
            return;
        canvas.width = container.offsetWidth * ratio;
        canvas.height = 250 * ratio;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(ratio, ratio);
        }
        canvas.style.width = '100%';
        canvas.style.height = '250px';
        if (data && data.length > 0) {
            pad?.fromData(data);
        }
    }
    onDibujoInicio(event: MouseEvent | Touch): void {
        console.log('Inicio firma conductor', event);
    }
    onDibujoInicioInspector(event: MouseEvent | Touch): void {
        console.log('Inicio firma inspector', event);
    }
    onFirmaCompletada(): void {
        if (!this.signaturePad) {
            Swal.fire('Error', 'El canvas de firma del conductor no está disponible', 'error');
            return;
        }
        if (this.signaturePad.isEmpty()) {
            return;
        }
        this.firmaBase64 = this.signaturePad.toDataURL('image/png');
    }
    limpiarFirma(): void {
        try {
            if (this.signaturePad) {
                this.signaturePad.clear();
            }
            this.firmaBase64 = null;
        }
        catch (error) {
            console.error('Error al limpiar firma del conductor:', error);
            this.firmaBase64 = null;
        }
    }
    onFirmaInspectorCompletada(): void {
        if (!this.signaturePadInspector) {
            Swal.fire('Error', 'El canvas de firma del inspector no está disponible', 'error');
            return;
        }
        if (this.signaturePadInspector.isEmpty()) {
            return;
        }
        this.firmaInspectorBase64 = this.signaturePadInspector.toDataURL('image/png');
    }
    limpiarFirmaInspector(): void {
        try {
            if (this.signaturePadInspector) {
                this.signaturePadInspector.clear();
            }
            this.firmaInspectorBase64 = null;
        }
        catch (error) {
            console.error('Error al limpiar firma del inspector:', error);
            this.firmaInspectorBase64 = null;
        }
    }
    getFieldClass(fieldName: string): string {
        const control = this.driverForm.get(fieldName);
        if (!control)
            return 'field-empty';
        const value = control.value;
        if (typeof value === 'string') {
            return value.trim() ? 'field-filled' : 'field-empty';
        }
        return value ? 'field-filled' : 'field-empty';
    }
    async onSubmit(): Promise<void> {
        if (this.driverForm.invalid) {
            this.driverForm.markAllAsTouched();
            await Swal.fire({
                title: 'Campos incompletos',
                text: 'Debes indicar el nombre del conductor y su identificación.',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        if (!this.firmaBase64) {
            await Swal.fire({
                title: 'Firma requerida',
                text: 'Debes capturar la firma del conductor.',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        if (!this.firmaInspectorBase64) {
            await Swal.fire({
                title: 'Firma requerida',
                text: 'Debes capturar la firma del inspector.',
                icon: 'warning',
                confirmButtonText: 'Entendido'
            });
            return;
        }
        if (!this.baseInspection) {
            await Swal.fire({
                title: 'Error',
                text: 'No existe una inspección base para duplicar.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
        this.isLoading = true;
        Swal.fire({
            title: 'Procesando...',
            text: 'Creando inspección heredada',
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
        try {
            const numero_certificado = await this.inspectionService.getNextCertificateNumber('U');
            const inheritedPayload = this.pickFields(this.baseInspection, INHERITED_PAYLOAD_FIELDS);
            const inheritedFormPayload = this.pickFields(this.inheritedForm.getRawValue(), INHERITED_FORM_FIELDS);
            const payload: any = {
                ...inheritedPayload,
                ...inheritedFormPayload,
            };
            this.removeForbiddenFields(payload);
            Object.assign(payload, {
                nombres_conductor: this.driverForm.value.nombres_conductor?.toUpperCase().trim(),
                identificacion: this.driverForm.value.identificacion?.trim(),
                numero_certificado,
                firma_conductor: this.firmaBase64,
                firma_inspector: this.firmaInspectorBase64,
            });
            console.log('Payload heredado:', payload);
            await this.inspectionService.createInspection(payload).toPromise();
            Swal.close();
            await Swal.fire({
                title: '¡Éxito!',
                html: `
          Se creó la inspección heredada correctamente.<br>
          <strong>Número:</strong> ${numero_certificado}
        `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/home']);
        }
        catch (error: any) {
            console.error('Error al crear inspección heredada:', error);
            Swal.close();
            await Swal.fire({
                title: 'Error',
                text: error?.message || 'No se pudo crear la inspección heredada.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
        finally {
            this.isLoading = false;
        }
    }
    cancelar(): void {
        this.router.navigate(['/home']);
    }
}
