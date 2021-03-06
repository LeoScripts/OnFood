import { useRouter } from "next/router";
import { PageTemplate, DishList } from "@/components";
import Styles from "../../styles/discovery.module.css"
import { api, CityProps, PageDiscoverProps, ParamStaticProps } from "@/services";

export default function Descobrir(props: PageDiscoverProps) {
  const { city } = props

  return (
    <PageTemplate>
      <div className={Styles.content}>
        <h1>Descobrir na região de {city.name}</h1>
        <p>Encontramos {city.catalogEtimated} opões</p>
        <div className={Styles.items}>
        <DishList citySlug={city.slug}/>

        </div>
      </div>
    </PageTemplate>
  );
}

export async function getStaticPaths() {
  const response = await api.get("/cities");
  const cities = response.data;

  const urls = cities.map((city: CityProps) => (
    {
      params: {
        city: city.slug,
      }
    }
  ));

  return {
    paths: urls,
    fallback: false
  }
}

export async function getStaticProps({ params }: ParamStaticProps) {
  const citySlug = params?.city as string;
  const response = await api.get(`/cities?citySlug=${citySlug}`);

  const city = response.data;

  return {
    props: {
      city
    },
    revalidate: 30 // segundos
  }
}