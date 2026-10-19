#!/usr/bin/env bash
# Preparação de ferramentas da VM Ubuntu do Claude; não acessa banco nem segredos.
set -euo pipefail

if [[ "$(uname -s)" != "Linux" ]]; then
  echo "Este script prepara a VM Linux do Claude, não o computador Windows." >&2
  exit 1
fi

case "$(uname -m)" in
  x86_64) node_arch=x64 ;;
  aarch64|arm64) node_arch=arm64 ;;
  *) echo "Arquitetura de CPU não suportada." >&2; exit 1 ;;
esac

node_version=24.22.0
node_root="/opt/educaja-node-${node_version}"
node_archive="node-v${node_version}-linux-${node_arch}.tar.xz"

if [[ ! -x "${node_root}/bin/node" ]]; then
  setup_temp="$(mktemp -d)"
  trap 'rm -rf -- "$setup_temp"' EXIT
  curl --fail --silent --show-error --location --retry 2 \
    "https://nodejs.org/dist/v${node_version}/${node_archive}" -o "${setup_temp}/${node_archive}"
  curl --fail --silent --show-error --location --retry 2 \
    "https://nodejs.org/dist/v${node_version}/SHASUMS256.txt" -o "${setup_temp}/SHASUMS256.txt"
  (cd "$setup_temp" && grep "  ${node_archive}$" SHASUMS256.txt | sha256sum --check --status)
  mkdir -p "$node_root"
  tar -xJf "${setup_temp}/${node_archive}" --strip-components=1 -C "$node_root"
fi

# Persistem no snapshot da VM; nenhum processo ou instalação local é compartilhado.
for executable in node npm npx; do
  ln -sfn "${node_root}/bin/${executable}" "/usr/local/bin/${executable}"
done
export PATH="${node_root}/bin:/usr/local/bin:${PATH}"
node --version
npm --version
echo "Ferramentas prontas. Após o clone do EducaJa, execute npm ci na raiz do repositório."
