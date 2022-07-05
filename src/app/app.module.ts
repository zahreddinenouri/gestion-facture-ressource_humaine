import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { VideoModalComponent } from './components/video-modal/video-modal.component';
import { FactComponent } from './components/fact/fact.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { FeatureComponent } from './components/feature/feature.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { TeamComponent } from './components/team/team.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddFactureComponent } from './components/add-facture/add-facture.component';
import { FacturesComponent } from './components/factures/factures.component';
import { InfoFactureComponent } from './components/info-facture/info-facture.component';
import { AddDevisComponent } from './components/add-devis/add-devis.component';
import { DevisComponent } from './components/devis/devis.component';
import { InfoDevisComponent } from './components/info-devis/info-devis.component';
import { AddEmployesComponent } from './components/add-employes/add-employes.component';
import { EmployesComponent } from './components/employes/employes.component';
import { AddCongeComponent } from './components/add-conge/add-conge.component';
import { CongeComponent } from './components/conge/conge.component';
import { FicheSalaireComponent } from './components/fiche-salaire/fiche-salaire.component';
import { SalaireComponent } from './components/salaire/salaire.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductComponent } from './components/product/product.component';
import { ClientAddDevisComponent } from './components/client-add-devis/client-add-devis.component';
import { InfoClientDevisComponent } from './components/info-client-devis/info-client-devis.component';
import { DevisClientComponent } from './components/devis-client/devis-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		HomeComponent,
		CarouselComponent,
		VideoModalComponent,
		FactComponent,
		AboutComponent,
		ServiceComponent,
		FeatureComponent,
		TestimonialComponent,
		TeamComponent,
		ContactComponent,
		SignUpComponent,
		LoginComponent,
		AddFactureComponent,
		FacturesComponent,
		InfoFactureComponent,
		AddDevisComponent,
		DevisComponent,
		InfoDevisComponent,
		AddEmployesComponent,
		EmployesComponent,
		AddCongeComponent,
		CongeComponent,
		FicheSalaireComponent,
		SalaireComponent,
		AddProductComponent,
		ProductComponent,
		ClientAddDevisComponent,
		InfoClientDevisComponent,
		DevisClientComponent,
		AddClientComponent
	],
	imports: [ BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
