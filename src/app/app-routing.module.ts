import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './components/add-client/add-client.component';
import { AddCongeComponent } from './components/add-conge/add-conge.component';
import { AddDevisComponent } from './components/add-devis/add-devis.component';
import { AddEmployesComponent } from './components/add-employes/add-employes.component';
import { AddFactureComponent } from './components/add-facture/add-facture.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ClientAddDevisComponent } from './components/client-add-devis/client-add-devis.component';
import { CongeComponent } from './components/conge/conge.component';
import { DevisClientComponent } from './components/devis-client/devis-client.component';
import { DevisComponent } from './components/devis/devis.component';
import { EmployesComponent } from './components/employes/employes.component';
import { FacturesComponent } from './components/factures/factures.component';
import { FicheSalaireComponent } from './components/fiche-salaire/fiche-salaire.component';
import { HomeComponent } from './components/home/home.component';
import { InfoClientDevisComponent } from './components/info-client-devis/info-client-devis.component';
import { InfoDevisComponent } from './components/info-devis/info-devis.component';
import { InfoFactureComponent } from './components/info-facture/info-facture.component';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { SalaireComponent } from './components/salaire/salaire.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'admin/sign-up', component: SignUpComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'add-facture', component: AddFactureComponent },
	{ path: 'add-devis', component: AddDevisComponent },
	{ path: 'client-add-devis', component: ClientAddDevisComponent },
	{ path: 'edit-devis/:id', component: AddDevisComponent },
	{ path: 'edit-facture/:id', component: AddFactureComponent },
	{ path: 'info-facture/:id', component: InfoFactureComponent },
	{ path: 'info-devis/:id', component: InfoDevisComponent },
	{ path: 'info-fiche/:id', component: FicheSalaireComponent },
	{ path: 'info-devisClient/:id', component: InfoClientDevisComponent },
	{ path: 'factures', component: FacturesComponent },
	{ path: 'devis', component: DevisComponent },
	{ path: 'devis-client', component: DevisClientComponent },
	{ path: 'add-employes', component: AddEmployesComponent },
	{ path: 'employes', component: EmployesComponent },
	{ path: 'add-conge/:id', component: AddCongeComponent },
	{ path: 'conge', component: CongeComponent },
	{ path: 'salaire/:id', component: SalaireComponent },
	{ path: 'product', component: ProductComponent },
	{ path: 'add-product', component: AddProductComponent },
	{ path: 'edit-product/:id', component: AddProductComponent },
	{path:'add-client',component:AddClientComponent}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
